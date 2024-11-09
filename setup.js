const fs = require('fs');
const path = require('path');

const structure = {
  'client': {
    'public': {},
    'src': {
      'components': {
        'Dashboard': {},
        'Games': {},
        'Predictions': {},
        'Stats': {}
      },
      'services': {},
      'utils': {}
    }
  },
  'server': {
    'config': {
      'db.js': 'module.exports = {\n  // Database configuration\n};'
    },
    'controllers': {
      'gameController.js': '// Game controller logic\n',
      'statsController.js': '// Stats controller logic\n',
      'predictionController.js': '// Prediction controller logic\n'
    },
    'middleware': {
      'auth.js': `const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;`
    },
    'models': {
      'Game.js': '// Game model schema\n',
      'Team.js': '// Team model schema\n',
      'Prediction.js': '// Prediction model schema\n'
    },
    'routes': {
      'games.js': '// Game routes\n',
      'stats.js': '// Stats routes\n',
      'predictions.js': '// Prediction routes\n'
    },
    'services': {
      'oddsService.js': '// Odds service logic\n',
      'statsService.js': '// Stats service logic\n',
      'predictionService.js': '// Prediction service logic\n'
    },
    'utils': {},
    'server.js': `const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`
  },
  'data': {
    'scrapers': {},
    'analysis': {}
  },
  'package.json': `{
  "name": "nfl-prediction-app",
  "version": "1.0.0",
  "description": "NFL Stats and Prediction Application",
  "main": "server/server.js",
  "scripts": {
    "start": "node server/server.js",
    "dev": "nodemon server/server.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}`,
  'README.md': `# NFL Prediction Application

This application provides NFL game statistics, trends analysis, and prediction capabilities based on historical data and betting odds.

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment variables:
Create a .env file in the root directory with:
\`\`\`
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
\`\`\`

3. Run the application:
\`\`\`bash
npm run dev
\`\`\`
`,
  'folder_structure.txt': `nfl-prediction-app/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Dashboard/
│       │   ├── Games/
│       │   ├── Predictions/
│       │   └── Stats/
│       ├── services/
│       └── utils/
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── gameController.js
│   │   ├── statsController.js
│   │   └── predictionController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Game.js
│   │   ├── Team.js
│   │   └── Prediction.js
│   ├── routes/
│   │   ├── games.js
│   │   ├── stats.js
│   │   └── predictions.js
│   ├── services/
│   │   ├── oddsService.js
│   │   ├── statsService.js
│   │   └── predictionService.js
│   ├── utils/
│   └── server.js
│
├── data/
│   ├── scrapers/
│   └── analysis/
│
├── .env
├── package.json
└── README.md`,
};

function createStructure(basePath, struct) {
  for (const [key, value] of Object.entries(struct)) {
    const currentPath = path.join(basePath, key);
    
    if (typeof value === 'string') {
      // If value is a string, create file with content
      fs.writeFileSync(currentPath, value);
    } else {
      // If value is an object, create directory and recurse
      fs.mkdirSync(currentPath, { recursive: true });
      if (Object.keys(value).length > 0) {
        createStructure(currentPath, value);
      }
    }
  }
}

// Create the project structure
const projectPath = process.cwd();
createStructure(projectPath, structure);

console.log('Project structure created successfully!'); 