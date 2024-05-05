
import styles from './HeaderText.module.css'

const HeaderText = () => {
    return (
        <div className={styles.headerContainter}>
            <div className={styles.headerText}>
                <p>Welcome, Please upload your geo json here..</p>
            </div>
        </div>
        
    );
};

export default HeaderText;
