const express = require('express')
const redis = require('redis')

// Create Express app object
const app = express();

// Create Redis client
const client = redis.createClient({
    // Define the host connection where the 
    // server is running
    host: 'redis-server',
    port: 6379
});

// Initialise 'visits' value.
client.set('visits', 0);

// Set the route to the app as root /
app.get('/', (req, res) => {
    // Get the value of visits/visitors
    client.get('visits', (err, visits) => {
        // Show the current visitors number and 
        // store it incremented by 1 for the next visit
        // to show.
        res.send('Number of visitors is ' + visits);
        client.set('visits', parseInt(visits) + 1);
    })
});

// Liten on port 8081
app.listen(8081, () => {
    console.log('Listening on port 8081');
});

/* 
import express from "express";
import { createClient } from 'redis';
 // Create Express app object
const app = express();
// Create Redis client
const client = createClient({
        // Define the host connection where the 
    // server is running
  url: 'redis://default:default@redis-server:6379'
});
 
(async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
 
  await client.connect();

  // Initialise 'visits' value.
  await client.set('visits', 0);
  // const value = await client.get('key');
})();
 
// client.set('visits', 0);

// Set the route to the app as root /
app.get('/', async (req, res) => {
  const visits = await client.get('visits')
        // Show the current visitors number and 
        // store it incremented by 1 for the next visit
        // to show.
  res.send(`Number of visits is ${visits}`);
      // Get the value of visits/visitors
  await client.set('visits', parseInt(visits) + 1);
});

// Liten on port 8081
app.listen(8081, () => {
  console.log('Listening on port 8081');
});
*/