import React from 'react';
import {useSelector} from 'react-redux';
import {View, TouchableOpacity, StyleSheet, Alert, Text} from 'react-native';
import {deleteRequest} from '../../utils/api-request';
import {pathDeleteTask} from '../../utils/api-path';
import {confirmMessage} from '../../utils/helpers';

import ItemText from './ItemText';
const Item = ({task, getTasks}) => {
  const token = useSelector(state => state.auth.access_token);
  const statusTask = useSelector(state => state.status);
  const {task_id, task_name, task_start, task_deadline, task_status} = task;

  const deleteTask = () => {
    const message = 'Are you sure you want to delete this item?';
    confirmMessage(message, actionDelete);
  };

  const actionDelete = async () => {
    const path = `${pathDeleteTask}/${task_id}`;
    try {
      await deleteRequest(path, token).then(res => {
        if (res.status === 200) {
          getTasks();
        } else {
          Alert.alert(res.result.message);
        }
      });
    } catch (error) {
      Alert.alert(error);
    }
  };

  const coverStatus = id => {
    if (!statusTask) return '--';
    const statusFilter = statusTask
      ? statusTask.filter(status => status.status_id === id)
      : [];
    const textStatus =
      statusFilter.length > 0 ? statusFilter[0].status_name : '--';

    return textStatus;
  };

  return (
    <View style={styles.item}>
      <ItemText label="Task id" value={task_id} />
      <ItemText label="Task name" value={task_name} />
      <ItemText label="Start date" value={task_start} />
      <ItemText label="Deadline" value={task_deadline} />
      <ItemText label="Status" value={coverStatus(task_status)} />
      <View style={styles.listBtn}>
        <TouchableOpacity
          style={styles.btnEdit}
          onPress={() => Alert.alert('Simple Button pressed')}>
          <Text style={styles.btn_text}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDel} onPress={deleteTask}>
          <Text style={styles.btn_text}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ddd',
  },
  listBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10,
  },
  btnEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 35,
    marginRight: 10,
    borderRadius: 2,
    backgroundColor: '#40d0a2',
  },
  btnDel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 35,
    borderRadius: 2,
    backgroundColor: '#f00',
  },
  btn_text: {
    fontSize: 15,
    color: '#fff',
  },
});
