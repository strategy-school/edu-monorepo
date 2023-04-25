const transactionStyles: { [key: string]: React.CSSProperties } = {
  container: { background: '#f1f2f4', padding: '20px', height: '100vh' },
  card: {
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#fff',
    gap: '15px',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    gap: '15px',
  },
  cardActions: {
    padding: '20px',
    borderTop: '1px solid #dde0e4',
    justifyContent: 'flex-end',
  },
  lineBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
    alignItems: 'center',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
    alignItems: 'center',
  },
  backBtn: {
    width: '32px',
    height: '32px',
    minWidth: 'unset',
  },
  moderationBtns: {
    marginLeft: 'auto',
  },
  filters: {
    borderBottom: '1px solid #dde0e4',
    padding: '8px',
  },
};

export default transactionStyles;