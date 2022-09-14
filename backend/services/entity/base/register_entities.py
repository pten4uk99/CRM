from services.entity import *
from services.entity.base.entity_collector import EntityCollector

EntityCollector.register(Visit)
EntityCollector.register(Client)
EntityCollector.register(Administrator)
EntityCollector.register(WorkShift)
EntityCollector.register(WorkDay)
EntityCollector.register(Master)
EntityCollector.register(PriceList)
EntityCollector.register(PriceItem)
EntityCollector.register(Service)
