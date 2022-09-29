from dataclasses import dataclass

from services.aggregates.base import ValueObject




if __name__ == '__main__':
    item = OnePriceItem(name='msd', price=123, description='dlcd;lc')
    print(item)
