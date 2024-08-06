import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {baseColors} from '@/styleVariables'

type TSizeTableProps = {
  sizeToQuantity: Record<string, number>
}

const SizeTable = (props: TSizeTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
      }}
    >
      <Table
        sx={{
          borderCollapse: 'separate',
        }}
        size='small'
        aria-label='a dense table'
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: `${baseColors['--gray-80']}`,
            }}
          >
            {Object.keys(props.sizeToQuantity).map((size, index) => (
              <TableCell
                align='center'
                sx={{
                  color: `${baseColors['--white']}`,
                  ...(index !== 0 && {
                    borderLeft: `1px solid ${baseColors['--gray-70']}`,
                  }),
                  borderBottom: 'none',
                }}
                key={size}
              >
                {size}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{color: `${baseColors['--gray-80']}`}}>
            {Object.values(props.sizeToQuantity).map((quantity, index, entries) => (
              <TableCell
                key={quantity}
                align='center'
                sx={{
                  ...(index === entries.length - 1 && {
                    borderRight: `1px solid ${baseColors['--gray-80']}`,
                    borderRadius: '0 0 8px 0',
                  }),
                  ...(index === 0 && {
                    borderRadius: '0 0 0 8px',
                  }),
                  borderLeft: `1px solid ${baseColors['--gray-80']}`,
                  borderBottom: `1px solid ${baseColors['--gray-80']}`,
                }}
              >
                {quantity}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SizeTable
