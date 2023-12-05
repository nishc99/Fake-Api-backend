// controllers/airlinesController.js
const path = require('path');
const fs = require('fs/promises');

async function readJsonData(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

async function writeJsonData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  getAirlines: async (req, res) => {
    try {
      const airlinesFilePath = path.join(__dirname, '..', 'public', 'airlines.json');
      const jsonData = await readJsonData(airlinesFilePath);
      res.json(jsonData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAirlineById: async (req, res) => {
    try {
      const airlineId = parseInt(req.params.id);
      const airlinesFilePath = path.join(__dirname, '..', 'public', 'airlines.json');
      const jsonData = await readJsonData(airlinesFilePath);
      const airline = jsonData.find(airline => airline.id === airlineId);

      if (!airline) {
        res.status(404).json({ error: 'Airline not found' });
        return;
      }

      res.json(airline);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createAirline: async (req, res) => {
    try {
      const airlinesFilePath = path.join(__dirname, '..', 'public', 'airlines.json');
      const jsonData = await readJsonData(airlinesFilePath);
      const newAirline = req.body;
      newAirline.id = jsonData.length + 1;
      jsonData.push(newAirline);
      await writeJsonData(airlinesFilePath, jsonData);
      res.json(newAirline);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateAirline: async (req, res) => {
    try {
      const airlineId = parseInt(req.params.id);
      const airlinesFilePath = path.join(__dirname, '..', 'public', 'airlines.json');
      const jsonData = await readJsonData(airlinesFilePath);
      const updatedAirlineIndex = jsonData.findIndex(airline => airline.id === airlineId);

      if (updatedAirlineIndex === -1) {
        res.status(404).json({ error: 'Airline not found' });
        return;
      }

      const updatedAirline = { ...jsonData[updatedAirlineIndex], ...req.body };
      jsonData[updatedAirlineIndex] = updatedAirline;
      await writeJsonData(airlinesFilePath, jsonData);
      res.json(updatedAirline);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateAirlinePartial: async (req, res) => {
    try {
      const airlineId = parseInt(req.params.id);
      const airlinesFilePath = path.join(__dirname, '..', 'public', 'airlines.json');
      const jsonData = await readJsonData(airlinesFilePath);
      const updatedAirlineIndex = jsonData.findIndex(airline => airline.id === airlineId);

      if (updatedAirlineIndex === -1) {
        res.status(404).json({ error: 'Airline not found' });
        return;
      }

      const updatedAirline = { ...jsonData[updatedAirlineIndex], ...req.body };
      jsonData[updatedAirlineIndex] = updatedAirline;
      await writeJsonData(airlinesFilePath, jsonData);
      res.json(updatedAirline);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteAirline: async (req, res) => {
    try {
      const airlineId = parseInt(req.params.id);
      const airlinesFilePath = path.join(__dirname, '..', 'public', 'airlines.json');
      const jsonData = await readJsonData(airlinesFilePath);
      const updatedJsonData = jsonData.filter(airline => airline.id !== airlineId);
      await writeJsonData(airlinesFilePath, updatedJsonData);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
