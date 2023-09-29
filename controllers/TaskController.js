//improtar model necessário
const Task = require("../models/Task");

module.exports = class TaskController {
  static createTask(req, res) {
    res.render("tasks/create");
  }

  // METODO PARA GET DE UPDATE
  static async showTasks(req, res) {
    try {
      const tasks = await Task.findAll({ raw: true });
      res.render("tasks/all", { tasks });
    } catch (err) {
      console.log(err);
    }
  }

  // UPDATE
  static async taskUpdate(req, res) {
    try {
      const taskId = req.body.taskId;

      const updateData = {
        title: req.body.title,
        description: req.body.description,
      };

      await Task.update(updateData, { where: { id: taskId } });
      res.redirect("/tasks");
    } catch (err) {
      console.log(err);
    }
  }

  static async showTask(req, res) {
    const id = req.params.id;
    const taskData = await Task.findOne({ where: { id: id }, raw: true });
    console.log(taskData);
    res.render("tasks/viewTask", { taskData });
  }

  // SALVAR DADOS
  static async taskSavePost(req, res) {
    try {
      const taskData = {
        title: req.body.title,
        description: req.body.description,
        done: false,
      };

      // validações
      // processar dados (remover todos caracter especial por exemplo)
      await Task.create(taskData);

      res.redirect("/tasks");
    } catch (err) {
      console.log(err);
    }
  }

  // EDITAR DADOS

  static async showEdit(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const taskData = await Task.findOne({ where: { id: id }, raw: true });
      console.log(taskData);
      res.render("tasks/showEdit", { taskData });
    } catch (err) {
      console.log(err);
    }
  }

  //CONCLUIR TAREFA

  static async toggleTaskStatus(req, res) {
    const id = req.body.id;

    const taskDone = {
      // alterar o done de acordo com o que vem do body  do post
      done: req.body.done === "0" ? true : false,
    };

    await Task.update(taskDone, { where: { id: id } });

    res.redirect("/tasks");
  }

  // REMOVER DADOS
  static async remove(req, res) {
    const taskId = req.body.taskId;

    await Task.destroy({ where: { id: taskId } });

    res.redirect("/tasks");
  }
};
