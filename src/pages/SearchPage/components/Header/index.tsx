import React, { useMemo, useState } from 'react';
import { Icon, SearchBar, Popover } from 'antd-mobile';
import { useTranslate } from '@/hooks/useTranslate';

const { Item } = Popover;

interface HeaderProps {
  onSearch: (value: string) => void;
  onNamespacesChange: (namespaces: string[]) => void;
}

export function Header({ onSearch, onNamespacesChange: onNamespaceChange }: HeaderProps) {
  const [search, setSearch] = useState('');
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const data = useTranslate();

  const menus = useMemo(() => {
    return data.map(item => (
      <Item key={item.namespace} className={namespaces.includes(item.namespace) ? 'text-blue-500' : ''}>
        {item.name}
      </Item>
    ));
  }, [data, namespaces]);

  return (
    <div className="flex items-center px-2 sticky top-0 z-10" style={{ background: '#efeff4' }}>
      <Popover
        mask
        placement="bottomLeft"
        onSelect={node => {
          let newNamespaces = [...namespaces];
          if (newNamespaces.includes(node.key)) {
            newNamespaces = newNamespaces.filter(item => item !== node.key);
          } else {
            newNamespaces.push(node.key);
          }
          setNamespaces(newNamespaces);
          onNamespaceChange(newNamespaces);
        }}
        overlay={menus}
      >
        <Icon type="ellipsis" className="text-gray-800" />
      </Popover>
      <SearchBar
        className="flex-1"
        value={search}
        onChange={setSearch}
        onSubmit={onSearch}
        onCancel={() => {
          setSearch('');
          onSearch('');
        }}
        placeholder="Search..."
      />
    </div>
  );
}
