const db_connection = require("../db-connection").promise();

// INSERTING Monitoring
exports.insert = async (req, res, next) => {

  if (!req.body.matter || !req.body.assignedMonitor || !req.body.date || !req.body.classroom) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
      fields: ["matter", "assignedMonitor", "date", "classroom"],
    });
  }

  try {

    const [rows] = await db_connection.execute(
      "INSERT INTO `monitoring`(`matter`,`assignedMonitor`,`date`,`classroom`) VALUES(?, ?, ?, ?)",
      [req.body.matter, req.body.assignedMonitor, req.body.date, req.body.classroom]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The monitoring has been successfully inserted.",
        id: rows.insertId,
      });
    }

  } catch (err) {
    next(err);
  }

};

// FETCHING ALL monitorings
exports.getAllMonitorings = async (req, res, next) => {
  try {

    const [rows] = await db_connection.execute("SELECT * FROM `monitoring`");

    if (rows.length === 0) {
      return res.status(200).json({
        message:
          "There are no monitorings in the database, please insert some monitorings.",
      });
    }

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }

};


// FETCHING SINGLE Monitoring
exports.getMonitoringByID = async (req, res, next) => {

  try {

    const [row] = await db_connection.execute(
        "SELECT * FROM `monitoring` WHERE `id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "No Monitoring Found!",
      });
    }

    res.status(200).json(row[0]);

  } catch (err) {
    next(err);
  }

};

// UPDATING Monitoring
exports.updateMonitoring = async (req, res, next) => {
  try {

    const [row] = await db_connection.execute(
        "SELECT * FROM `monitoring` WHERE `id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "Invalid Monitoring ID",
      });
    }

    if (req.body.matter) row[0].matter = req.body.matter;

    if (req.body.assignedMonitor) row[0].assignedMonitor = req.body.assignedMonitor;

    if (req.body.date) row[0].date = req.body.date;

    if (req.body.classroom) row[0].classroom = req.body.classroom;

    const [update] = await db_connection.execute(
      "UPDATE `monitoring` SET `matter`=?, `assignedMonitor`=?, `date`=?, `classroom`=? WHERE `id`=?",
      [row[0].matter,row[0].assignedMonitor,row[0].date,row[0].classroom,req.params.id]
    );

    if (update.affectedRows === 1) {
      return res.json({
        message: "The Monitoring has been successfully updated.",
      });
    }

  } catch (err) {
    next(err);
  }

};

// DELETING Monitoring
exports.deleteMonitoring = async (req, res, next) => {

  try {

    const [row] = await db_connection.execute(
        "DELETE FROM `monitoring` WHERE `id`=?",
        [req.params.id]
    );

    if (row.affectedRows === 0) {
      return res.status(404).json({
        message: "Invalid Monitoring ID (No Monitoring Found!)",
      });
    }

    res.status(200).json({
      message: "The Monitoring has been deleted successfully.",
    });
    
  } catch (err) {
    next(err);
  }

};