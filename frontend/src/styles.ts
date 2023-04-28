import { Property } from 'csstype';
import TextTransform = Property.TextTransform;
import theme from '@/src/theme';
import marketingBg from '@/src/assets/images/marketing-bg.jpg';

export const stylesGlobal = {
  title: {
    fontWeight: 600,
    textTransform: 'uppercase' as TextTransform,
    lineHeight: '1.6',
  },
  fontSize: {
    xs: '20px',
    lg: '30px',
  },
};

export const borderRadius = '35px';
export const boxShadow = '10px 10px 37px #e9e9e9, -10px -10px 37px #ffffff';
export const blockPadding = '30px';

export const blockStyle = {
  margin: '10px',
  borderRadius,
  boxShadow,
  padding: 0,
};

export const blockTopStyle = {
  color: theme.palette.secondary.main,
  paddingTop: '10px',
  paddingBottom: '10px',
  borderTopLeftRadius: '35px',
  borderTopRightRadius: '35px',
};

export const welcomeBlockStyle = {
  welcomeBlock: {
    boxShadow,
    borderRadius,
    background: `url(${marketingBg.src}) no-repeat`,
    backgroundSize: 'cover',
  },
  after: {
    content: '',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,.6)',
    zIndex: 2,
    borderRadius,
  },
  padding: { sm: '15px', md: '30px' },
  height: { xs: '200px', sm: '300px', md: '400px', lg: '450px' },
  title: {
    fontWeight: 700,
    lineHeight: '1.5',
  },
  fontSize: { xs: '18px', sm: '25px', md: '35px', lg: '38px' },
  maxWidth: { xs: '170px', sm: '250px', md: '450px', lg: '495px', xl: '635px' },
};

export const courseCardStyle = {
  courseCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: 'inset 0px 0px 21px 4px #ECECEC',
    },
  },
  cardBody: {
    borderRadius,
    position: 'relative' as const,
  },
  height: {
    xs: '100px',
    md: '200px',
  },
  width: {
    xs: '300px',
    sm: '400px',
    md: '600px',
  },
  innerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontSize: {
    xs: '14px',
    sm: '18px',
    md: '26px',
  },
};
