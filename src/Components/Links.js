import { links } from '../config/links';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  list: {
    marginTop: '1rem',
    listStyle: 'disc',
    paddingLeft: '1.2rem'
  },
  listItem: {
    marginBottom: '0.5rem',
  },
  link: {
    color: '#2563eb',
    fontWeight: 400,
    fontSize: '12px',
    textDecoration: 'none',
    cursor: 'pointer',
  }
};

const Links = ({ style }) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <div style={styles.heading}>Links</div>
      <ul style={styles.list}>
        {links.map(link => (
          <li key={link.id} style={styles.listItem}>
            <a style={styles.link} href={link.url}>
              {link.description}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Links; 