const info = {
  roomSelection: {
    deluxeSeaView: [
      {
        id: 'DSV-1',
        price: 10000,
      },
      {
        id: 'DSV-2',
        price: 10000,
      },
      {
        id: 'DSV-3',
        price: 10000,
      },
    ],
    superiorSeaView: [
      {
        id: 'SSV-1',
        price: 10000,
      },
      {
        id: 'SSV-2',
        price: 10000,
      },
      {
        id: 'SSV-3',
        price: 10000,
      },
    ],
    standardRoom: [
      {
        id: 'STD-1',
        price: 10000,
      },
      {
        id: 'STD-2',
        price: 10000,
      },
      {
        id: 'STD-3',
        price: 10000,
      },
    ],
    totalPayment: 0,
  },
}
document.write(
  JSON.stringify(
    info.roomSelection[Object.keys(info.roomSelection)[0]]
      .map((e) => e.id)
      .indexOf('DSV-3'),
  ),
)
