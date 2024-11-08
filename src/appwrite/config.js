import conf from "../conf/conf.js";
import { nanoid } from "@reduxjs/toolkit";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class AppwriteService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteEndPoint)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Function to retrieve all spending records for a user
  async getAllSpendingRecords(userEmail) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.spendingRecordsCollectionId,
        [Query.equal("user_id", userEmail)] // Fetch records for the authenticated user
      );
      return response.documents;
    } catch (error) {
      console.error("AppwriteService :: getAllSpendingRecords :: error", error);
      throw error;
    }
  }

  // Function to retrieve daily record for a user
  async getDailyRecord(userEmail) {
    const date = new Date();
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.dailyRecordsCollectionId,
        [Query.equal("user_id", userEmail), Query.equal("date", date)] // Fetch records for the authenticated user
      );
      return response.documents;
    } catch (error) {
      console.error("AppwriteService :: getAllSpendingRecords :: error", error);
      throw error;
    }
  }

  // Function to create a daily record
  async createDailyRecord({
    user_id, // Ensure correct naming (user_id instead of user_Id)
    date,
    total_income,
    total_spending,
    net_income,
  }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.dailyRecordsCollectionId,
        {
          id: nanoid(),
          user_id, // Corrected to user_id
          date,
          total_income,
          total_spending,
          net_income,
        }
      );
      return response; // Return the document's response to be handled in Redux
    } catch (error) {
      console.error("AppwriteService :: createDailyRecord :: error", error);
      throw error;
    }
  }

  // Function to update an existing daily record using the date
  async updateDailyRecordByDate(userEmail, date, updatedData) {
    try {
      // Fetch documents that match the user_id and date
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.dailyRecordsCollectionId,
        [Query.equal("user_id", userEmail), Query.equal("date", date)]
      );

      // Check if any record was found
      if (response.documents.length === 0) {
        throw new Error(
          `No record found for user ${userEmail} on date ${date}`
        );
      }

      // Update the first matching document (you can change this logic if multiple documents might exist)
      const recordId = response.documents[0].$id; // Get the ID of the first document found
      const updatedResponse = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.dailyRecordsCollectionId,
        recordId, // Update the document with the found ID
        updatedData // The updated data object
      );

      // Log success
      console.log(
        `Successfully updated record for user ${userEmail} on date ${date}`
      );

      // Return the updated document
      return updatedResponse;
    } catch (error) {
      // Enhanced error handling
      console.error(
        "AppwriteService :: updateDailyRecordByDate :: error",
        error
      );
      throw new Error(`Failed to update daily record: ${error.message}`);
    }
  }

  // Function to create a spending record and link it to a daily record
  async createSpendingRecord({
    date,
    daily_record_id,
    category,
    amount,
    user_id,
  }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.spendingRecordsCollectionId,
        ID.unique(), // Generate a unique ID for the document
        {
          id: nanoid(),
          date,
          user_id, // Ensure this is passed correctly
          daily_record_id, // This links to the corresponding daily record
          category,
          amount,
        }
      );
      return response;
    } catch (error) {
      console.error("AppwriteService :: createSpendingRecord :: error", error);
      throw error;
    }
  }
}

// Instantiate AppwriteService
const appwriteServiceInstance = new AppwriteService();
export default appwriteServiceInstance;
