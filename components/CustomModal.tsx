import React, {ReactNode, useState} from 'react';
import {Modal, View, Text, StyleSheet, Button} from 'react-native';
import { Colors } from "../constants/Colors.ts";
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const [iconColor, setIconColor] = useState('black'); // Initial color of the icon

  const handleIconPress = () => {
    // Toggle the color of the icon when pressed
    setIconColor(iconColor === 'black' ? 'green' : 'black');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={styles.contentContainer}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconContainer: {
    marginBottom: 10,
  },
  contentContainer: {
    // backgroundColor: 'green',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default CustomModal;
