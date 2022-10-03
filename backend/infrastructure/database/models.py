from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime, Boolean, Enum, BigInteger, Text
from sqlalchemy.orm import relationship

from infrastructure.database.base import BaseModel
from services.aggregates.visit.entity import StatusChoice

BaseModel.metadata.naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}


class AllowedIpAddressDB(BaseModel):
    __tablename__ = 'allowed_ip_address'

    pk = Column(Integer, primary_key=True, index=True)
    ip = Column(String, nullable=False)


class AdministratorDB(BaseModel):
    __tablename__ = 'administrator'

    pk = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    work_shifts = relationship('WorkShiftDB', back_populates='administrator')


class MasterDB(BaseModel):
    __tablename__ = 'master'

    pk = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    work_days = relationship('MasterWorkDayDB', back_populates='master')
    visits = relationship('VisitDB', back_populates='master')


class WorkDayDB(BaseModel):
    __tablename__ = 'work_day'

    pk = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False, unique=True)
    masters = relationship('MasterWorkDayDB', back_populates='work_day')


class MasterWorkDayDB(BaseModel):
    __tablename__ = 'master_work_day'

    master_id = Column(ForeignKey('master.pk', ondelete='CASCADE'), primary_key=True)
    work_day_id = Column(ForeignKey('work_day.pk', ondelete='CASCADE'), primary_key=True)
    master = relationship('MasterDB', back_populates='work_days')
    work_day = relationship('WorkDayDB', back_populates='masters')


class PriceListDB(BaseModel):
    __tablename__ = 'price_list'

    pk = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)

    price_item_generic_links = relationship('PriceItemGenericLinkDB', back_populates='price_list')


class PriceItemGenericLinkDB(BaseModel):
    __tablename__ = 'price_item_generic_link'

    pk = Column(Integer, primary_key=True, index=True)
    table_name = Column(String, nullable=False)
    object_id = Column(Integer, nullable=False)
    price_list_id = Column(Integer, ForeignKey('price_list.pk'), nullable=False)

    price_list = relationship('PriceListDB', back_populates='price_item_generic_links')
    services = relationship('ServiceDB', back_populates='price_item_generic')


class ServiceDB(BaseModel):
    __tablename__ = 'service'

    pk = Column(Integer, primary_key=True, index=True)
    price_item_generic_id = Column(Integer, ForeignKey('price_item_generic_link.pk'))
    visit_id = Column(Integer, ForeignKey('visit.pk'))

    price_item_generic = relationship('PriceItemGenericLinkDB', back_populates='services')
    visit = relationship('VisitDB', back_populates='services')


class OnePriceItemDB(BaseModel):
    __tablename__ = 'one_price_item'

    pk = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Integer, nullable=False)


class ThreePriceItemDB(BaseModel):
    __tablename__ = 'three_price_item'

    pk = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    shirt_price = Column(Integer)
    middle_price = Column(Integer)
    long_price = Column(Integer)


class WorkShiftDB(BaseModel):
    __tablename__ = 'work_shift'

    pk = Column(Integer, primary_key=True, index=True)
    datetime = Column(DateTime)
    is_closed = Column(Boolean)
    administrator_id = Column(ForeignKey('administrator.pk'))

    administrator = relationship('AdministratorDB', back_populates='work_shifts')
    visits = relationship('VisitDB', back_populates='work_shift')


class VisitDB(BaseModel):
    __tablename__ = 'visit'

    pk = Column(Integer, primary_key=True, index=True)
    datetime_start = Column(DateTime, nullable=False)
    datetime_end = Column(DateTime, nullable=False)
    client_id = Column(Integer, ForeignKey('client.pk'))
    master_id = Column(Integer, ForeignKey('master.pk'), nullable=False)
    either_master = Column(Boolean, nullable=False)
    work_shift_id = Column(Integer, ForeignKey('work_shift.pk'))
    status = Column(String, Enum(StatusChoice), nullable=False)
    delete_reason = Column(String)
    comment = Column(Text)
    paid = Column(Integer)
    discount = Column(Integer)
    card = Column(Integer)

    master = relationship('MasterDB', back_populates='visits')
    client = relationship('ClientDB', back_populates='visits')
    services = relationship('ServiceDB', back_populates='visit')
    work_shift = relationship('WorkShiftDB', back_populates='visits')


class ClientDB(BaseModel):
    __tablename__ = 'client'

    pk = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    last_name = Column(String)
    phone = Column(BigInteger, nullable=False, unique=True)

    visits = relationship('VisitDB', back_populates='client')
