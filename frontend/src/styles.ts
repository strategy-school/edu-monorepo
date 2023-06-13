import { Property } from 'csstype';
import TextTransform = Property.TextTransform;
import theme from '@/src/theme';
import marketingBg from '@/src/assets/images/marketing-bg.jpg';
import TextAlign = Property.TextAlign;

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
  maxWidth: {
    xs: '100%',
    lg: '75%',
  },
};

export const borderRadius = '35px';
export const boxShadow = '10px 10px 37px #e9e9e9, -10px -10px 37px #ffffff';
export const blockPadding = '30px';

export const blockStyle = {
  margin: '10px',
  borderRadius,
  boxShadow,
  padding: '15px',
};

export const blockTopStyle = {
  color: theme.palette.info.dark,
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
  fontSize: { xs: '15px', sm: '25px', md: '35px', lg: '38px' },
  maxWidth: { xs: '250px', sm: '500px', md: '600px', lg: '700px', xl: '850px' },
};

export const afterCourseStyle = {
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSize: '75px',
};

export const cardStyle = {
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  cardBody: {
    borderRadius,
    margin: '20px',
  },
  height: {
    xs: '100px',
    md: '200px',
    lg: '300px',
  },
  width: {
    xs: '300px',
    sm: '400px',
    md: '600px',
    lg: '800px',
  },
  innerStyle: {
    display: 'flex',
  },
  fontSize: {
    xs: '12px',
    sm: '18px',
    md: '26px',
  },
};

export const fullCardStyle = {
  card: {
    cursor: 'pointer',
  },
  cardBody: {
    borderRadius,
    margin: '20px',
  },
  padding: { sm: '20px', md: '40px' },
  innerStyle: {
    display: 'flex',
  },
  width: '100%',
  height: '100%',
  fontSize: {
    xs: '20px',
    sm: '26px',
    md: '50px',
  },
};

export const whyUs = {
  whyUsItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 25px 0 ',
  },
  whyUsText: {
    margin: '0 0 0 15px',
    textAlign: 'justify' as TextAlign,
  },
};

export const clientStyle = {
  fontSize: {
    xs: '14px',
    sm: '16px',
    md: '20px',
  },
};

export const ONE_BY_ONE_ANIMATION = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.75,
    },
  }),
  hidden: {
    opacity: 0,
    scale: 0.1,
    y: 20,
  },
};

export const BLOCK_ANIMATION = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.75,
    },
  },
};
