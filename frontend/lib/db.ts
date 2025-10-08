import clientPromise from './mongodb';

export async function getDatabase() {
  const client = await clientPromise;
  return client.db('Computer_Buddy'); // Change to your database name
}

export async function getUsersCollection() {
  const db = await getDatabase();
  return db.collection('users');
}
