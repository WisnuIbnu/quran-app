import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // sesuaikan path

export const useTheme = () => useContext(ThemeContext);
