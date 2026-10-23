import {initializeTestEnvironment, assertFails, assertSucceeds} from '@firebase/rules-unit-testing';
import {beforeAll, afterAll, test} from 'vitest';
import {readFileSync} from 'node:fs';
import {doc, setDoc, Timestamp, getDoc, deleteDoc, updateDoc} from 'firebase/firestore';


let testEnv;

beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
        projectId: 'app-mototaxi-646d4',
        firestore: {
            rules: readFileSync('firestore.rules', 'utf8'),
        },
    });
});

afterAll(async () => {
    if (testEnv) {
        await testEnv.cleanup();
    }
});

test("rejects a trip with a negative price", async () => {
    const db = testEnv.authenticatedContext('user_123').firestore();

    const tripData = {
        userId: 'user_123',
        pickup:"san gregorio",
        destination:"centro",
        price: -10,
        createdAt: Timestamp.now(),
    };
    await assertFails(setDoc(doc(db, 'trips', 'trip_1'), tripData));

    
});

test("rejects a trip created for another user", async () => {
        const db = testEnv.authenticatedContext('user_123').firestore();
        const tripData = {
            userId: 'user_456',
            pickup:"san gregorio",
            destination:"centro",
            price: 10,
            createdAt: Timestamp.now(),
        };
        await assertFails(setDoc(doc(db, 'trips', 'trip_2'), tripData));
    });

    test("allows a user to create their own trip", async () => {
        const db = testEnv.authenticatedContext('user_123').firestore();
        const tripData = {
            userId: 'user_123',
            pickup:"san gregorio",
            destination:"centro",
            price: 10,
            createdAt: Timestamp.now(),
        };
        await assertSucceeds(setDoc(doc(db, 'trips', 'trip_3'), tripData));
    });

    test("rejects a trip with an empty pickup location", async () => {
        const db = testEnv.authenticatedContext('user_123').firestore();
        const tripData = {
            userId: 'user_123',
            pickup: "",
            destination: "centro",
            price: 10,
            createdAt: Timestamp.now(),
        };
        await assertFails(setDoc(doc(db, 'trips', 'trip_4'), tripData));
    });

    test("rejects a trip with an empty destination", async () => {
        const db = testEnv.authenticatedContext('user_123').firestore();
        const tripData = {
            userId: 'user_123',
            pickup: "san gregorio",
            destination: "",
            price: 10,
            createdAt: Timestamp.now(),
        };
        await assertFails(setDoc(doc(db, 'trips', 'trip_5'), tripData));
    });

    test("rejects a trip from an unauthenticated user", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const tripData = {
            userId: 'user_123',
            pickup: "san gregorio",
            destination: "centro",
            price: 10,
            createdAt: Timestamp.now(),
        };
        await assertFails(setDoc(doc(db, 'trips', 'trip_6'), tripData));
});

test("rejects a user from reading another user's trip", async () => {
    const db = testEnv.authenticatedContext('user_123').firestore();
    const tripData = {
        userId: 'user_456',
        pickup: "san gregorio",
        destination: "centro",
        price: 10,
        createdAt: Timestamp.now(),
    };
    await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'trips', 'trip_7'), tripData);
    });
    const tripRef = doc(db, 'trips', 'trip_7');
    await assertFails(getDoc(tripRef));
});

test("allows a user to read their own trip", async () => {
    const db = testEnv.authenticatedContext('user_123').firestore();
    const tripData = {
        userId: 'user_123',
        pickup: "san gregorio", 
        destination: "centro",
        price: 10,
        createdAt: Timestamp.now(),
    };
    await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'trips', 'trip_8'), tripData);
    });
    const tripRef = doc(db, 'trips', 'trip_8');
    await assertSucceeds(getDoc(tripRef));
});


test("rejects a user from deleting trips of another user", async () => {
    const db = testEnv.authenticatedContext('user_123').firestore();
    const tripData = {
        userId: 'user_456',
        pickup: "san gregorio",
        destination: "centro",
        price: 10,
        createdAt: Timestamp.now(),
    };
    await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'trips', 'trip_9'), tripData);
    });
    const tripRef = doc(db, 'trips', 'trip_9');
    await assertFails(deleteDoc(tripRef));
});

test("rejects a user from updating trips of another user", async () => {
    const db = testEnv.authenticatedContext('user_123').firestore();
    const tripData = {
        userId: 'user_456',
        pickup: "san gregorio",
        destination: "centro",
        price: 10,
        createdAt: Timestamp.now(),
    };
    await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'trips', 'trip_10'), tripData);
    });
    const tripRef = doc(db, 'trips', 'trip_10');
    await assertFails(updateDoc(tripRef, { price: 15 }));
});