const router = require('express').Router();
const validators = require('./validators');
const monitorsController = require('./controllers/monitorsControllers');
const monitoringController = require('./controllers/monitoringControllers');

// Inserting Monitors
router.post(
    '/insert-monitors',
    validators.monitorsInfo,
    validators.result,
    monitorsController.insert
);

// Fetching all Monitors
router.get(
    '/get-all-monitors',
    monitorsController.getAllMonitors
);

// Fetching Single Monitors By ID
router.get(
    '/get-monitor/:id',
    validators.id,
    validators.result,
    monitorsController.getMonitorByID
);

// Updating Monitors
router.patch(
    '/update-monitor/:id',
    [...validators.id, ...validators.monitorsInfo],
    validators.result,
    monitorsController.updateMonitor
);

// Deleting Monitors
router.delete(
    '/delete-monitor/:id',
    validators.id,
    validators.result,
    monitorsController.deleteMonitor
);

//second part

// Inserting Monitorings
router.post(
    '/insert-monitorings',
    validators.monitoringsInfo,
    validators.result,
    monitoringController.insert
);

// Fetching all Monitorings
router.get(
    '/get-all-monitorings',
    monitoringController.getAllMonitorings
);

// Fetching Single Monitorings By ID
router.get(
    '/get-monitoring/:id',
    validators.id,
    validators.result,
    monitoringController.getMonitoringByID
);

// Updating Monitorings
router.patch(
    '/update-monitoring/:id',
    [...validators.id, ...validators.monitoringsInfo],
    validators.result,
    monitoringController.updateMonitoring
);

// Deleting Monitorings
router.delete(
    '/delete-monitoring/:id',
    validators.id,
    validators.result,
    monitoringController.deleteMonitoring
);


module.exports = router;