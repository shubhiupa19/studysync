require("dotenv").config();
const faker = require('faker');
const mongoose = require('mongoose');
const Form = require('./models/formsModel');
// const StudyGroup = require('./models/studyGroupModel');
const User = require('./models/userModel');



// Connect to MongoDB Atlas

const uri = 'mongodb+srv://su2132:TOvZ0duOymFboNak@cluster0.w3bcha9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri, { useNewUrlParser: true});

// Function to generate fake form data
const generateFakeFormData = () => {
    return {
        title: faker.lorem.words(),
        description: faker.lorem.sentences(),
        questions: [
            { questionText: faker.lorem.sentence(), type: 'text' },
            { questionText: faker.lorem.sentence(), type: 'multiple-choice', options: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()] },
            // Add more questions as needed
        ]
    };
};

// Function to generate fake study group data
// const generateFakeStudyGroupData = () => {
//     return {
//         name: faker.company.companyName(),
//         description: faker.lorem.sentences(),
//         members: [] // Add member IDs later
//     };
// };

// Function to insert fake forms for a user
const insertFakeFormsForUser = async (userId, numForms) => {
    for (let i = 0; i < numForms; i++) {
        const formData = generateFakeFormData();
        formData.creator_id = userId;
        const form = new Form(formData);
        await form.save();
        console.log(`Inserted form ${i + 1}/${numForms}`);
    }
};

// Function to insert fake study groups for a user
// const insertFakeStudyGroupsForUser = async (userId, numStudyGroups) => {
//     for (let i = 0; i < numStudyGroups; i++) {
//         const studyGroupData = generateFakeStudyGroupData();
//         studyGroupData.creator_id = userId;
//         const studyGroup = new StudyGroup(studyGroupData);
//         await studyGroup.save();
//         console.log(`Inserted study group ${i + 1}/${numStudyGroups}`);
//     }
// };

// Function to get a random user ID from the database
const getRandomUserId = async () => {
    return '660c26fb47883ff8b335343e';
};

// Usage: Insert fake forms and study groups for a random user
const numForms = 5;
const numStudyGroups = 3;
getRandomUserId().then(userId => {
    insertFakeFormsForUser(userId, numForms);
    // insertFakeStudyGroupsForUser(userId, numStudyGroups);
});
