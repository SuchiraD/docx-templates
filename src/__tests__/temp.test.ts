/* eslint-env jest */

import path from 'path';
import fs from 'fs';
import MockDate from 'mockdate';
import QR from 'qrcode';
import { createReport } from '../index';
import { UserOptions } from '../types';
import { setDebugLogSink } from '../debug';
import JSZip from 'jszip';

if (process.env.DEBUG) setDebugLogSink(console.log);

const LONG_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo sagittis erat, sed vehicula lorem molestie et. Sed eget nisi orci. Fusce ut scelerisque neque. Donec porta eleifend dolor. Morbi in egestas augue. Nunc non velit at nisl faucibus ultrices. Aenean ac lacinia tortor. Nunc elementum enim ut viverra maximus. Pellentesque et metus posuere, feugiat nulla in, feugiat mauris. Suspendisse eu urna aliquam, molestie ante at, convallis justo.
Nullam hendrerit quam sit amet nunc tincidunt dictum. Praesent hendrerit at quam ac fermentum. Donec rutrum enim lacus, mollis imperdiet ex posuere ac. Sed vel ullamcorper massa. Duis non posuere mauris. Etiam purus turpis, fermentum a rhoncus et, rutrum in nisl. Aliquam pharetra sit amet lectus sed bibendum. Sed sem ipsum, placerat a nisl vitae, pharetra mattis libero. Nunc finibus purus id consectetur sagittis. Pellentesque ornare egestas lacus, in blandit diam facilisis eget. Morbi nec ligula id ligula tincidunt tincidunt vulputate id erat. Quisque ut eros et sem pharetra placerat a vel leo. Praesent accumsan neque imperdiet, facilisis ipsum interdum, aliquam mi. Sed posuere purus eu sagittis aliquam.\n
Morbi dignissim consequat ex, non finibus est faucibus sodales. Integer sed justo mollis, fringilla ipsum tempor, laoreet elit. Nullam iaculis finibus nulla a commodo. Curabitur nec suscipit velit, vitae lobortis mauris. Integer ac bibendum quam, eget pretium justo. Ut finibus, sem sed pharetra dictum, metus mauris tristique justo, sed congue erat mi a leo. Aliquam dui arcu, gravida quis magna ac, volutpat blandit felis. Morbi quis lobortis tortor. Cras pulvinar feugiat metus nec commodo. Sed sollicitudin risus vel risus finibus, sit amet pretium sapien fermentum. Nulla accumsan ullamcorper felis, quis tempor dolor. Praesent blandit ullamcorper pretium. Ut viverra molestie dui.`;

['noSandbox', 'sandbox'].forEach(sbStatus => {
  const noSandbox = sbStatus === 'sandbox' ? false : true;

  describe(`${sbStatus}`, () => {
    describe('Template processing', () => {
      beforeEach(() => {
        // Set a global fixed Date. Some tests check the zip contents,
        // and the zip contains the date
        MockDate.set('1/1/2000');
      });
      afterEach(() => {
        MockDate.reset();
      });

      it('Add bookmarks - bookmark should be correctly added', async () => {
        const template = await fs.promises.readFile(
          path.join(__dirname, 'fixtures', 'bookmark.docx')
        );
        const result = await createReport(
          {
            noSandbox,
            template,
            data: {},
          },
          'JS'
        );

        // await fs.writeFile('./bookmark-generated.docx', result, err => {
        //   if (err) console.log(err);
        //   else {
        //     console.log('File written successfully\n');
        //     console.log('The written file has the following contents:');
        //     console.log(fs.readFileSync('movies.txt', 'utf8'));
        //   }
        // });
        expect(result).toBeDefined();
      });
    });
  });
});
