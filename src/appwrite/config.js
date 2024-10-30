import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class AppwriteService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndPoint)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Function to retrieve all spending records

  async getAllSpendingRecords() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.spendingRecordsCollectionId
      );
      return response.documents;
    } catch (error) {
      console.error("AppwriteService :: getAllSpendingRecords :: error", error);
      throw error;
    }
  }
  

  // Function to create a daily record
  async createDailyRecord({
    userId,
    date,
    total_income,
    total_spending,
    net_income,
  }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.dailyRecordsCollectionId, // Use the daily records collection ID
        ID.unique(),
        {
          userId,
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

  // Function to create a spending record and link it to a daily record
  async createSpendingRecord({ daily_record_id, category, amount }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.spendingRecordsCollectionId, // Use the spending records collection ID
        ID.unique(),
        {
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

  // You can add other methods for deleting or retrieving records if needed, similar to these ones
}

// appwrite/config.js
const appwriteServiceInstance = new AppwriteService();
export default appwriteServiceInstance;