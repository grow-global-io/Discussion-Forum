import { Chip } from "@mui/material";
import styles from '../styles/Home.module.css';

const Trends = ({ tags, sort }) => {
    console.log("tagsa", tags);
    const uniqueTags = [...new Set(tags)];
    console.log("🚀 ~ Trends ~ uniqueTags:", uniqueTags)

    return (
        <div className={styles.trend}>
            {tags && (
                uniqueTags.map(tag => (
                    <Chip key={tag} clickable onClick={(e) => sort(e)} label={`#${tag}`} variant='filled' color='secondary' size='small' />
                ))
            )}
        </div>
    );
}

export default Trends;