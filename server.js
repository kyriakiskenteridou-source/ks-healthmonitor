const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Global middleware to map limit/offset → _limit/_start
server.use((req, res, next) => {
  if (req.query.limit) {
    req.query._limit = req.query.limit;
    delete req.query.limit;
  }
  if (req.query.offset) {
    req.query._start = req.query.offset;
    delete req.query.offset;
  }
  next();
});


// Custom login endpoint
server.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ access_token: user.access_token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Custom POST /patients to use patient_id instead of default id
server.post('/patients', (req, res) => {
  const db = router.db; // lowdb instance
  const patients = db.get('patients');

  const existingPatients = patients.value();
  const newPatientId =
    existingPatients.length > 0
      ? Math.max(...existingPatients.map(p => p.patient_id || 0)) + 1
      : 1;

  const newPatient = {
    ...req.body,
    patient_id: newPatientId
  };

  patients.push(newPatient).write();

  res.status(201).json({ patient_id: newPatientId });
});

// Add other routes
server.use(router);

// Start server
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});