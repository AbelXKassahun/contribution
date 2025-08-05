import { useState } from 'react';
import {
  Paper,
  SimpleGrid,
  ScrollArea
} from '../../../../libs';

import DeclarationFilter from '../../../Components/Declaration_Filter';
import Declaration_Cards, { type Declaration } from '../../../Components/Declaration-Card/Declaration_Card';

import { mockDeclarations } from '../../../../libs/MockData';

type DeclarationListProp = {
  DeclarationListType: "complete" | "incomplete" | "all";
  DeclarationsData?: Declaration[]
}

const Declaration_History = ({ DeclarationListType }: DeclarationListProp) => {
  const orderByStatus = DeclarationListType === "complete" ? "paid" : DeclarationListType === "incomplete" ? "unpaid" : "all";

  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('all');

  const filteredDeclarations = mockDeclarations.filter((declaration) => {
    const monthMatch = month ? declaration.month === month : true;
    const yearMatch = year ? declaration.year === year : true;
    const statusMatch = status === 'all' || declaration.status === status;
    return monthMatch && yearMatch && statusMatch;
  });

  return (
    <Paper mt="0" p="0">
      {/*Filter section*/}
      {/* <DeclarationFilter month={month} setMonth={setMonth} year={year} setYear={setYear} status={status} setStatus={setStatus} /> */}
      <DeclarationFilter month={month} setMonth={setMonth} year={year} setYear={setYear} setStatus={setStatus} />
      {/*Filtered Declaration Cards */}
      <ScrollArea h={500} type="auto" pr="15px">
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="sm"
        >
          {
            filteredDeclarations
              .filter((declaration) => orderByStatus === "all" || declaration.status === orderByStatus)
              .map((declaration) => (
                <Declaration_Cards
                  key={declaration.id}
                  id={declaration.id}
                  month={declaration.month}
                  year={declaration.year}
                  status={declaration.status}
                  registeredCount={declaration.registeredCount}
                  unregisteredCount={declaration.unregisteredCount}
                  totalAmount={declaration.totalAmount}
                />
              ))
          }
        </SimpleGrid>
      </ScrollArea>

    </Paper>
  );
}

export default Declaration_History