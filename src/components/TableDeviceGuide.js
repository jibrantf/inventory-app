

const TableDeviceGuide = ({ data }) => {
    return (
      <div className="overflow-x-auto max-h-[200px] overflow-y-auto w-full">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-1 py-2">Nama Part Box</th>
              <th className="border border-gray-300 px-2 py-2">Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((device) => (
              <tr key={device.id_part_box}>
                <td className="border border-gray-300 px-4 py-2">{device.nama_part_box}</td>
                <td className="border border-gray-300 px-4 py-2">{device.serial_number_part_box}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableDeviceGuide;
  