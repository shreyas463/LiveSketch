const electron = require('electron');
const connectDB = require('./db.js');  // Import MongoDB connection from db.js
const app = electron.app;
let db;  // To hold the database connection

async function createWindow() {
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    win.loadFile('index.html').then(function () {
        win.maximize();
        // win.webContents.openDevTools();
    });

    // Connect to MongoDB when the window is created
    db = await connectDB();  // Connect to MongoDB here
    console.log("MongoDB connection is ready in main process");
}

// Function to store user actions (like drawing, erasing, etc.)
async function storeUserAction(action) {
    const actionsCollection = db.collection('userActions');
    await actionsCollection.insertOne(action);
    console.log('Stored action:', action);
}

// Example function to retrieve actions (to be used for loading existing data)
async function getUserActions() {
    const actionsCollection = db.collection('userActions');
    const actions = await actionsCollection.find({}).toArray();
    return actions;
}

app.whenReady().then(createWindow);

// Example: Call storeUserAction whenever a user action happens (drawing/erasing)
// Call this from your frontend when a user performs an action, for example:
// storeUserAction({ userId: 'user123', actionType: 'draw', timestamp: new Date(), data: { x: 100, y: 200, color: 'blue' } });
