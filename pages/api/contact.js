import { ConnectionCheckOutFailedEvent, MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    // Server side data validation
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input!" });
      return;
    }
    // once validation is passes, adding storing the data in db.
    const newMessage = {
      email,
      name,
      message,
    };
    console.log(newMessage);

    let client;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.dbddhxq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Couldn't connect to database." });
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res
        .status(500)
        .json({ message: "Failed to insert message into database." });
      return;
    }
    client.close();
    res.status(201).json({
      message: "Successfully stored the message..!",
      message: newMessage,
    });
  }
}

export default handler;
