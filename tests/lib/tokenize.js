/**
 * @fileoverview Tests for tokenize().
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert = require("chai").assert,
    espree = require("../../espree");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("tokenize()", function() {

    describe("ECMAScript 5 mode", function() {

        it("should throw when using regular expression u flag", function() {

            assert.throws(function() {
                espree.tokenize("var foo = /foo/u;");
            }, /Invalid regular expression flag/);

        });

        it("should throw when using regular expression y flag", function() {

            assert.throws(function() {
                espree.tokenize("var foo = /foo/y;");
            }, /Invalid regular expression flag/);

        });

    });

    it("should produce tokens when using let", function() {
        var tokens = espree.tokenize("let foo = bar;", {
            ecmaFeatures: { blockBindings: true },
            loc: true,
            range: true
        });
        assert.deepEqual(tokens, require("../fixtures/tokenize/let-result.tokens.js"));
    });

    it("should produce tokens when using const", function() {
        var tokens = espree.tokenize("const foo = bar;", {
            ecmaFeatures: { blockBindings: true },
            loc: true,
            range: true
        });
        assert.deepEqual(tokens, require("../fixtures/tokenize/const-result.tokens.js"));
    });

    it("should produce tokens when using regular expression u flag", function() {
        var tokens = espree.tokenize("var foo = /foo/u;", {
            ecmaFeatures: { regexUFlag: true },
            loc: true,
            range: true
        });
        assert.deepEqual(tokens, require("../fixtures/tokenize/regexp-u-result.tokens.js"));
    });

    it("should produce tokens when using regular expression y flag", function() {
        var tokens = espree.tokenize("var foo = /foo/y;", {
            ecmaFeatures: { regexYFlag: true },
            loc: true,
            range: true
        });
        assert.deepEqual(tokens, require("../fixtures/tokenize/regexp-y-result.tokens.js"));
    });

    // Make sure we don't introduce the same regex parsing error as Esprima
    it("should produce tokens when using regular expression wrapped in parens", function() {
        var tokens = espree.tokenize("(/foo/).test(bar);", {
            loc: true,
            range: true
        });
        assert.deepEqual(tokens, require("../fixtures/tokenize/regex-in-parens-result.tokens.js"));
    });

});
