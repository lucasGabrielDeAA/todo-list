import React from 'react';
import Loading from 'react-loading-components';

import styles from './styles';

const LoadingIndicator = () => (
    <div style={styles.loadingContainer}>
        <Loading type='ball_triangle' width={100} height={100} fill='#11ffaa' />
    </div>
);

export default LoadingIndicator;
