import type { User } from '~/types/user';

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

const DB_NAME = 'auth-form-db';
const STORE_NAME = 'users';
const DB_VERSION = 1;

export async function initDB(): Promise<IDBDatabase> {
  try {
    return await new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new DatabaseError(`Failed to open database: ${request.error?.message || 'Unknown error'}`));
      };

      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        try {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'email' });
          }
        } catch (error) {
          reject(new DatabaseError(`Failed to upgrade database: ${error instanceof Error ? error.message : 'Unknown error'}`));
        }
      };
    });
  } catch (error) {
    throw new DatabaseError(`Database initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function addUser(email: string, password: string, name: string): Promise<void> {
  try {
    const db = await initDB();
    const hashedPassword = await hashPassword(password);
    
    await new Promise<void>((resolve, reject) => {
      try {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        const user: User = {
          email,
          password: hashedPassword,
          name,
        };
        
        const request = store.put(user);
        
        request.onerror = () => {
          reject(new DatabaseError(`Failed to add user: ${request.error?.message || 'Unknown error'}`));
        };
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => {
          reject(new DatabaseError(`Transaction failed: ${transaction.error?.message || 'Unknown error'}`));
        };
        
        request.onsuccess = () => resolve();
      } catch (error) {
        reject(new DatabaseError(`Add user operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  } catch (error) {
    throw new DatabaseError(`Failed to add user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const db = await initDB();
    
    return await new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(email);
        
        request.onerror = () => {
          reject(new DatabaseError(`Failed to get user: ${request.error?.message || 'Unknown error'}`));
        };
        
        transaction.onerror = () => {
          reject(new DatabaseError(`Transaction failed: ${transaction.error?.message || 'Unknown error'}`));
        };
        
        request.onsuccess = () => resolve(request.result);
      } catch (error) {
        reject(new DatabaseError(`Get user operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  } catch (error) {
    throw new DatabaseError(`Failed to get user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const newHash = await hashPassword(password);
    return newHash === hashedPassword;
  } catch (error) {
    throw new DatabaseError(`Password verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function hashPassword(password: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    throw new DatabaseError(`Password hashing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
