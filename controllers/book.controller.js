import { Book } from "../models/book.model.js";
import { uploadOnCloudinary } from "../utils/cloudinaryConfig.js";

//add a book
export const addBook = async (req, res) => {
  try {
    const { title, email, author, phone, publishYear } = req.body;

    if (!title || !email || !author || !phone || !publishYear) {
      return res.status(400).send({
        message:
          "Send all required fields: title, email, author, phone, publishYear",
      });
    }

    // Check for avatar file
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //console.log(avatarLocalPath)
    if (!avatarLocalPath)
      throw new Error("Avatar local path is missing from controller");

    // Upload avatar to Cloudinary
    const avatarUploadResponse = await uploadOnCloudinary(avatarLocalPath);
    //console.log(avatarUploadResponse)
    if (!avatarUploadResponse || !avatarUploadResponse.url) {
      throw new Error("Avatar failed to upload to Cloudinary from controller");
    }

    const newBook = {
      title,
      author,
      phone,
      email,
      publishYear,
      avatar: avatarUploadResponse.url,
    };
    const book = await Book.create(newBook);

    return res.status(201).send({ book, message: "Book created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//get books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
      message: "Book found successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//get a single book
export const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Id is not Found");

    const book = await Book.findById(id);

    return res.status(201).json({ book, message: "Book is Found" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//update a book
//update a book
export const updateBook = async (req, res) => {
  try {
    const { title, email, author, phone, publishYear } = req.body;

    // Check if all required fields are provided
    if (!title || !email || !author || !phone || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, email, author, phone, publishYear",
      });
    }
    
    const { id } = req.params;

    // Find the book by id
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update avatar if it's included in the request
    if (req.file) {
      const avatarLocalPath = req.file.path;
      const avatar = await uploadOnCloudinary(avatarLocalPath);
      if (!avatar.url) {
        throw new Error("Avatar URL is missing from update controller");
      }

      const  updatedBook = await Book.findByIdAndUpdate(
        req?.book?._id,
        {
          $set: {
            avatar: avatar.url,
          },
        },
        { new: true }
      );

    //   // Update book with new avatar URL
    //   updatedBook.avatar = avatar.url;
    //   await updatedBook.save();
    }

    return res.status(200).json({ updatedBook, message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};



// export const updateBook = async (req, res) => {
//   try {
//     const { title, email, author, phone, publishYear } = req.body;

//     if (!title || !email || !author || !phone || !publishYear || !avatar) {
//       return res.status(400).send({
//         message:
//           "Send all required fields: title, email, author, phone, publishYear",
//       });
//     }
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).send({ message: "id is not found" });
//     }

//     const updatedBook = await Book.findByIdAndUpdate(id, req.body);
//     if (!updatedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     // Update avatar if it's included in the request
//     if (req.file) {
//       const avatarLocalPath = req.file.path;
//       const avatar = await uploadOnCloudinary(avatarLocalPath);
//       if (!avatar.url) {
//         throw new Error("Avatar URL is missing from update controller");
//       }

//       // Update book with new avatar URL
//       updatedBook.avatar = avatar.url;
//       await updatedBook.save();
//     }

//     return res
//       .status(200)
//       .send({ updatedBook, message: "Book updated successfully" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// };


//delete a book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


{/* 
//update a book
export const updateBook = async (req, res) => {
  try {
    const { title, email, author, phone, publishYear } = req.body;

    if (!title || !email || !author || !phone || !publishYear || !avatar) {
      return res.status(400).send({
        message:
          "Send all required fields: title, email, author, phone, publishYear",
      });
    }
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "id is not found" });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .send({ result, message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//update avatar
export const updateBookAvatar = async (req, res) => {
  try {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) throw new Error("AVater local path is missing from update controller");
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.url) throw new Error("avatar is missing from update controller");

    const book = await Book.findByIdAndUpdate(
      req?.book?._id,
      {
        $set: {
          avatar: avatar.url,
        },
      },
      { new: true }
    );

    return res
      .status(201)
      .json({ book, message: "Book avatar is updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
*/}