const router = require('express').Router();
const validators = require('./validators');
const monitorsController = require('./controllers/monitorsControllers');
const monitoringController = require('./controllers/monitoringControllers');

// Inserting Monitors
router.post(
    '/monitors',
    validators.monitorsInfo,
    validators.result,
    monitorsController.insert
);

// Fetching all Monitors
router.get(
    '/monitors',
    monitorsController.getAllMonitors
);

// Fetching Single Monitors By ID
router.get(
    '/monitors/:id',
    validators.id,
    validators.result,
    monitorsController.getMonitorByID
);

// Updating Monitors
router.patch(
    '/monitors/:id',
    [...validators.id, ...validators.monitorsInfo],
    validators.result,
    monitorsController.updateMonitor
);

// Deleting Monitors
router.delete(
    '/monitors/:id',
    validators.id,
    validators.result,
    monitorsController.deleteMonitor
);

//second part

// Inserting Monitorings
router.post(
    '/monitorings',
    validators.monitoringsInfo,
    validators.result,
    monitoringController.insert
);

// Fetching all Monitorings
router.get(
    '/monitorings',
    monitoringController.getAllMonitorings
);

// Fetching Single Monitorings By ID
router.get(
    '/monitorings/:id',
    validators.id,
    validators.result,
    monitoringController.getMonitoringByID
);

// Updating Monitorings
router.patch(
    '/monitorings/:id',
    [...validators.id, ...validators.monitoringsInfo],
    validators.result,
    monitoringController.updateMonitoring
);

// Deleting Monitorings
router.delete(
    '/monitorings/:id',
    validators.id,
    validators.result,
    monitoringController.deleteMonitoring
);


module.exports = router;