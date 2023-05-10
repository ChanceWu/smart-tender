import { getTreeFromList } from '@/utils/tender';
import { useState, useCallback, useEffect } from 'react';

export default function useTenderModel() {
  const [dirList, setDirList] = useState<TenderType.TenderDir[]>([]);
  const [dirTree, setDirTree] = useState<TenderType.TenderDirTreeNode[]>([]);

  const [preFormat, setPreFormat] = useState<TenderType.PreFormat>();

  useEffect(() => {
    setDirTree(getTreeFromList(dirList));
  }, [dirList]);

  const delDir = useCallback(
    (id: string) => {
      const newDirList = dirList.filter((v) => v.id !== id);
      setDirList(newDirList);
    },
    [dirList],
  );

  const updateDir = useCallback(
    (d: TenderType.TenderDir) => {
      const newDirList = dirList.map((v) => {
        if (v.id !== d.id) return v;
        return { ...v, name: d.name };
      });
      setDirList(newDirList);
    },
    [dirList],
  );

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
    delDir,
    updateDir,
    dirTree,
    setDirTree,
    preFormat,
    setPreFormat,
  };
}
