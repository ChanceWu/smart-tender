import { useState, useCallback } from 'react';

export default function useTenderModel() {
  const [dirList, setDirList] = useState<TenderType.TenderDir[]>([]);
  const [dirTree, setDirTree] = useState<TenderType.TenderDirTreeNode[]>([]);

  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, []);

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, []);

  return {
    dirList,
    setDirList,
    dirTree,
    setDirTree,
  };
}
