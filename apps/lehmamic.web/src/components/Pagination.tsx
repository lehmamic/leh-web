import { Box } from '@mui/material';
import { ArrowLeft, ArrowRight } from 'mdi-material-ui';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useMemo } from 'react';
import Link from './Link';

export interface PaginationProps {
  current: number;
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ current, total }) => {
  const router = useRouter();

  const hasPrev = useMemo(() => current > 1, [current]);
  const prevLink = useMemo(() => `${router.pathname}/?page=${current - 1}`, [router, current]);

  const hasNext = useMemo(() => current < total, [current, total]);
  const nextLink = useMemo(() => `${router.pathname}/?page=${current + 1}`, [router, current]);

  return (
    <Box sx={(theme) => ({display: 'flex', flexDirection: 'row'})}>
      <Link href={prevLink} sx={(theme) => ({ color: theme.palette.text.primary, mr: theme.spacing(1), visibility: hasPrev ? 'visible' : 'hidden' })}>
        <ArrowLeft />
      </Link>
        {`Page ${current} of ${total}`}
      <Link href={nextLink} sx={(theme) => ({ color: theme.palette.text.primary, ml: theme.spacing(1), visibility: hasNext ? 'visible' : 'hidden' })}>
        <ArrowRight />
      </Link>
    </Box>
  );
};
