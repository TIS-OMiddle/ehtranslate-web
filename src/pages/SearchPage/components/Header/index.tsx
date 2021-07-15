import React, { useState } from 'react';
import { Icon, SearchBar, Popover } from 'antd-mobile';

const Item = Popover.Item;

interface HeaderProps {
  onSearch: (value: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [search, setSearch] = useState('');
  const [popVisible, setPopVisible] = useState(false);

  return (
    <div className="flex items-center px-2" style={{ background: '#efeff4' }}>
      <Popover
        placement="bottomLeft"
        visible={popVisible}
        onSelect={(node, index) => {
          console.log('ljh', node, index);
          setPopVisible(false);
        }}
        onVisibleChange={setPopVisible}
        overlay={[
          <Item key="0">Scan</Item>,
          <Item key="1">My Qrcode</Item>,
          <Item key="2">
            <span style={{ marginRight: 5 }}>Help</span>
          </Item>,
        ]}
      >
        <Icon key="1" type="ellipsis" className="text-gray-800" />
      </Popover>
      <SearchBar className="flex-1" value={search} onChange={setSearch} onSubmit={onSearch} placeholder="Search..." />
    </div>
  );
}
