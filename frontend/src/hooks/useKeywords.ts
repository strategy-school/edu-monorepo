const useKeywords = <T>(data: T[], key: string) => {
  return data.map((item) => item[key as keyof T]).join(', ');
};

export default useKeywords;
