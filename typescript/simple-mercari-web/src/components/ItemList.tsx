import { useEffect, useState } from 'react';
import { Item, fetchItems } from '~/api';

const PLACEHOLDER_IMAGE = import.meta.env.VITE_FRONTEND_URL + '/logo192.png';

interface Prop {
  reload: boolean;
  onLoadCompleted: () => void;
}

export const ItemList = ({ reload, onLoadCompleted }: Prop) => {
  const [items, setItems] = useState<Item[]>([]);
  /* 商品データを取得 */
  useEffect(() => {
    const fetchData = () => {
      fetchItems()
        .then((data) => {
          console.debug('GET success:', data);
          setItems(data.items);
          onLoadCompleted();
        })
        .catch((error) => {
          console.error('GET error:', error);
        });
    };

    if (reload) {
      fetchData();
    }
  }, [reload, onLoadCompleted]);
  /* 商品データを表示 */
  return (
    <div className='item-list-container'>
      {items.map((item) => {
        return (
          <div key={item.id} className="ItemList">
            {/* TODO: Task 2: Show item images */}
            <img 
            src={`http://localhost:9000/image/${item.image_name}`} alt={item.name} className='item-image'
            onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
            />
            <p>
              <span>Name: {item.name}</span>
              <br />
              <span>Category: {item.category}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
