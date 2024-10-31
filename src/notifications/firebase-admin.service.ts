import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  constructor(private configService: ConfigService) {
    const serviceAccount = this.configService.get<string>('FIREBASE_SERVICE_ACCOUNT');
    if (!serviceAccount) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT is not defined in the configuration');
    }
    
    try {
      // Parse the JSON string
      const parsedServiceAccount = JSON.parse(serviceAccount);
      admin.initializeApp({
        credential: admin.credential.cert(parsedServiceAccount),
      });
      console.log('Firebase admin initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase admin:', error);
      throw error;
    }
  }

  async sendPushNotification(token: string, message: admin.messaging.MessagingPayload) {
    try {
      await admin.messaging().sendToDevice(token, message);
      console.log('Push notification sent successfully');
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}