export const mockNCStatus = [
  {
    nc_id: "NC-1-2",
    nc_ip: "192.168.1.2",
    region: "Factory 1",
    prod_line: "Ball Screw-S1",
    station: "Surface Grinding",
    opStatus: "running",
    running_flag: 1,
    ncfile: "run_100.nc",
    maintainStatus: 0,
    utilize_rate: 76
  },
  {
    nc_id: "NC-1-3",
    nc_ip: "192.168.1.3",
    region: "Factory 1",
    prod_line: "Roll Block-RB1",
    station: "Milling",
    opStatus: "running",
    running_flag: 1,
    ncfile: "run_200.nc",
    maintainStatus: 0,
    utilize_rate: 85
  },
  {
    nc_id: "NC-2-1",
    nc_ip: "192.168.2.1",
    region: "Factory 2",
    prod_line: "Gear Box-GB2",
    station: "Lathe turning",
    opStatus: "idle",
    running_flag: 1,
    ncfile: "run_100.nc",
    maintainStatus: 0,
    utilize_rate: 33
  },
];

export const mockNCFiles = [
  {
    id: 1,
    name: 'program_001.nc',
    size: 2048,
    uploadDate: '2026-01-15T08:00:00Z',
    status: 'ready',
  },
  {
    id: 2,
    name: 'program_002.nc',
    size: 1536,
    uploadDate: '2026-01-18T14:30:00Z',
    status: 'processing',
  },
];
