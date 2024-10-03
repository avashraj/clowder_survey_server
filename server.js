require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGOURI, {
    dbName: 'surveyTest'
});

const surveySchema = new mongoose.Schema({
    Name: String,
    Email: String,
    LabSection: {
        type: String,
        enum: ['02L','03L','O4L']
    },
    Python: Number,
    PytorchTensorflowKeras: Number,
    OpenCV: Number,
    Numpy: Number,
    Pandas: Number,
    Tkinter: Number,
    python_adds: {
        type: Map,
        of: Number
    },
    CandCpp: Number,
    Csharp: Number,
    Java: Number,
    ML: Number,
    ObjectDetection: Number,
    ImageClassification: Number,
    Regression: Number,
    LLM: Number,
    ReinforcementLearning: Number,
    GenerativeAI: Number,
    ml_adds:  {
        type: Map,
        of: Number,
    },
    AppDev: Number,
    WebDev: Number,
    Frontend: Number,
    HTML_CSS: Number,
    FrontFrameworks: Number,
    Backend: Number,
    BackFrameworks: Number,
    APIs: Number,
    Both: Number,
    Javascript: Number,
    MERN: Number,
    Cloudc: Number,
    dataManagement: Number,
    SQL: Number,
    noSQL: Number,
    GameEngines: Number,
    Unity: Number,
    Unreal: Number,
    GIS: Number,
    Microcontrollers: Number,
    Alg_DS: Number,
    Networking: Number,
    CN_Security: Number,
    Systems_Prog: Number,
    Git: Number,
    other_adds:  {
        type: Map,
        of: Number,
    },
});

const SurveyModel = mongoose.model('Survey', surveySchema, 'test1');


app.post('/api/saveSurvey' , async (req, res) => {

    const surveyData = req.body.surveyData;
    const newSurvey = new SurveyModel(surveyData);

    try {
        await newSurvey.save();
        res.status(200).json({success: true, message: 'success saving to db'});
    } catch (error) {
        res.status(500).json({success: false, message: 'error saving to db'})
    }
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});
