describe('global variables', function() {
  it('has chai, sinon', function() {
    expect(should).not.to.be.null;
    expect(sinon).not.to.be.null;
    sinon.should.not.to.be.null;
  });
});