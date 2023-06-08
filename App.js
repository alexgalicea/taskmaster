import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const TaskItem = ({ task, onDelete }) => {
  return (
    <View style={styles.taskItem}>
      <Text>{task}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const TaskList = ({ tasks, onDeleteTask }) => {
  return (
    <View>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} onDelete={() => onDeleteTask(index)} />
      ))}
    </View>
  );
};

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() !== '') {
      onAddTask(task.trim());
      setTask('');
    }
  };

  return (
    <View style={styles.taskInputContainer}>
      <TextInput
        style={styles.taskInput}
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholder="Enter a task"
      />
      <TouchableOpacity onPress={handleAddTask}>
        <Text style={styles.addButton}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TaskMaster</Text>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <Text style={styles.aboutLink}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About TaskMaster</Text>
      <Text>This app helps you manage your tasks and stay organized.</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: 4,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
  },
  aboutLink: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App;
