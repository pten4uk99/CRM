from enum import Enum

from infrastructure.database.models import OnePriceItemDB, ThreePriceItemDB


class PriceItemGenericTables(Enum):
    one_price_item = OnePriceItemDB
    three_price_item = ThreePriceItemDB


if __name__ == '__main__':
    print(PriceItemGenericTables.one_price_item.value)
