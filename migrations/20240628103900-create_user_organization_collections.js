import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt"
import { getRandomElement } from '../utils/getRandomElement.js';

export const up = async (db, client) => {
    const organizations = [];
    for (let i = 0; i < 50; i++) {  
        organizations.push({
            name: faker.company.name(),
            created_at:new Date()
        });
    }
    const insertedOrganizations=await db.collection('organizations').insertMany(organizations);
    const organizationIds = Object.values(insertedOrganizations.insertedIds);
    const users = [];
    for (let i = 0; i < 50; i++) { 
        const randomOrganizationId=getRandomElement(organizationIds)
        console.log(randomOrganizationId)
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(faker.internet.password({ length: 10 }), salt);
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password,
            created_at:new Date(),
            role: i<45 ? "user" : "admin",
            organization:randomOrganizationId
        });
        
    }
    await db.collection('users').insertMany(users);
};

export const down = async (db, client) => {
    await db.collection('users').deleteMany({});
    await db.collection('organizations').deleteMany({});
};
