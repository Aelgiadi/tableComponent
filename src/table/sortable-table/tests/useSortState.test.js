/** @jest-environment jsdom */
// @flow
/* eslint-env jest */
/* eslint-disable no-unused-vars */
/* eslint-disable flowtype/no-unused-expressions */

import { useEffect, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import useSortState from '../useSortState';

let container = document.createElement('div');
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body?.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

describe('useSortState', () => {
  it('initializes correctly', () => {
    function Component() {
      const [index, ascending] = useSortState([]);
      expect(index).toBe(null);
      expect(ascending).toBe(true);
      return null;
    }
    render(<Component />, container);
  });

  it('initializes correctly with no starting column', () => {
    const columns = [{ title: '1', get: x => x }];
    function Component() {
      const [index, ascending] = useSortState(columns);
      expect(index).toBe(null);
      expect(ascending).toBe(true);
      return null;
    }
    render(<Component />, container);
  });

  it('initializes correctly with a starting column', () => {
    const columns = [{ title: '1', get: x => x, initialSort: true }];
    function Component() {
      const [index, ascending] = useSortState(columns);
      expect(index).toBe(0);
      expect(ascending).toBe(true);
      return null;
    }
    render(<Component />, container);
  });

  it('initializes correctly with a starting noncomparable column', () => {
    const columns = [
      { title: '1', get: x => x, initialSort: true, compare: false },
    ];
    function Component() {
      const [index, ascending] = useSortState(columns);
      expect(index).toBe(null);
      return null;
    }
    render(<Component />, container);
  });

  it('initializes correctly with a starting column w/ascending', () => {
    const columns = [
      {
        title: '1',
        get: x => x,
        initialSort: true,
        initialSortAscending: false,
      },
    ];
    function Component() {
      const [index, ascending] = useSortState(columns);
      expect(index).toBe(0);
      expect(ascending).toBe(false);
      return null;
    }
    render(<Component />, container);
  });

  it('sorts by a new column', () => {
    const columns = [
      { title: '1', get: x => x },
      { title: '2', get: x => x },
    ];
    function Component() {
      const [index, ascending, sort] = useSortState(columns);
      if (index == null) sort(1);
      return [index, ascending];
    }
    act(() => {
      render(<Component />, container);
    });
    expect(container.textContent).toBe('1');
  });

  it('toggles ascending on same column', () => {
    const columns = [{ title: '1', get: x => x, initialSort: true }];
    function Component() {
      const [index, ascending, sort] = useSortState(columns);
      const [count, setCount] = useState(0);
      if (count < 4) {
        expect(ascending).toBe(count % 2 === 0);
        sort(0);
        setCount(count + 1);
      }
      return null;
    }
    render(<Component />, container);
  });

  it('resets ascending on new column', () => {
    const columns = [
      {
        title: '1',
        get: x => x,
        initialSort: true,
        initialSortAscending: false,
      },
      { title: '2', get: x => x },
    ];
    function Component() {
      const [index, ascending, sort] = useSortState(columns);
      if (index === 0) {
        sort(1);
      } else {
        expect(ascending).toBe(true);
      }
      return index;
    }
    render(<Component />, container);
  });

  it('resets index when column is not comparable', () => {
    function Component() {
      const [columns, setColumns] = useState([
        {
          title: '1',
          get: x => x,
          initialSort: true,
          initialSortAscending: false,
        },
      ]);
      const [index, ascending, sort] = useSortState(columns);
      if (columns[0].title === '1') {
        expect(index).toBe(0);
        setColumns([{ title: '2', get: x => x, compare: false }]);
      } else {
        expect(index).toBe(null);
      }
      return index;
    }
    render(<Component />, container);
  });
});
