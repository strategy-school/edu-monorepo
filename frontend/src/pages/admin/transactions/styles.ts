const transactionStyles: { [key: string]: React.CSSProperties } = {
  card: {
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
  },
  cardActions: {
    padding: '20px',
    borderTop: '1px solid #dde0e4',
    justifyContent: 'flex-end',
  },
  cardImage: { width: '100px', height: '100px', borderRadius: '10px' },
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
