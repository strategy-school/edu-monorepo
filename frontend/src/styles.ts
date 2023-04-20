import { Property } from 'csstype';
import TextTransform = Property.TextTransform;
import theme from '@/src/theme';

export const stylesGlobal = {
  title: {
    fontWeight: 600,
    fontSize: '30px',
    textTransform: 'uppercase' as TextTransform,
    lineHeight: '1.6',
  },
};

export const borderRadius = '35px';
export const boxShadow = '10px 10px 37px #e9e9e9, -10px -10px 37px #ffffff';
export const blockPadding = '30px';

export const blockStyle = {
  margin: '10px',
  borderRadius,
  boxShadow,
  border: '1px solid rgb(217, 39, 45)',
  padding: 0,
};

export const blockTopStyle = {
  color: theme.palette.secondary.main,
  paddingTop: '10px',
  paddingBottom: '10px',
  borderTopLeftRadius: '35px',
  borderTopRightRadius: '35px',
};
